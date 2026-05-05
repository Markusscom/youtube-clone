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
}
