<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function store(Request $request, $videoId)
    {
        $like = $request->user()->likes()->create(['video_id' => $videoId]);
        return response()->json($like, 201);
    }

    public function destroy(Request $request, $videoId)
    {
        $request->user()->likes()->where('video_id', $videoId)->delete();
        return response()->json(null, 204);
    }
}
