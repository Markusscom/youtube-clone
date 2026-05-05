<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function store(Request $request, $channelId)
    {
        $subscription = $request->user()->subscriptions()->create(['channel_id' => $channelId]);
        return response()->json($subscription, 201);
    }

    public function destroy(Request $request, $channelId)
    {
        $request->user()->subscriptions()->where('channel_id', $channelId)->delete();
        return response()->json(null, 204);
    }
}
