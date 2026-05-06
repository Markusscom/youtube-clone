<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function index()
    {
        return Video::with('user')->latest()->get();
    }

    public function show($id)
    {
        return Video::with('user')->findOrFail($id);
    }

    public function store(Request $request)
    {
        \Log::info('Upload Request:', $request->all());

        if ($request->hasFile('video')) {
            \Log::info('File received:', ['name' => $request->file('video')->getClientOriginalName(), 'size' => $request->file('video')->getSize()]);
        } else {
            \Log::error('No video file in request.');
        }

        $validator = \Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video' => 'required|file|mimes:mp4,mov,avi,mpeg|max:102400',
        ]);

        if ($validator->fails()) {
            \Log::error('Validation failed:', $validator->errors()->toArray());
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $path = $request->file('video')->store('videos', 'public');
        $validated = $validator->validated();
        $validated['video_url'] = '/storage/' . $path;
        unset($validated['video']);

        $video = $request->user()->videos()->create($validated);

        return response()->json($video, 201);
    }

    public function update(Request $request, $id)
    {
        $video = $request->user()->videos()->findOrFail($id);

        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'string',
            'thumbnail_url' => 'nullable|string',
        ]);

        $video->update($validated);

        return response()->json($video);
    }

    public function destroy(Request $request, $id)
    {
        $video = $request->user()->videos()->findOrFail($id);
        $video->delete();

        return response()->json(null, 204);
    }
}
