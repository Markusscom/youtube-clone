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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'required|string',
            'thumbnail_url' => 'nullable|string',
        ]);

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
