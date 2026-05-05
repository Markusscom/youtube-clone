<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model {
    protected $fillable = ['user_id', 'title', 'description', 'video_url', 'thumbnail_url'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}