<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    //

    public function index()
    {
        return response()->json(
            [
                "status" => "success",
                "data" => Post::where('visibility', 'public')->orderBy('created_at')->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'visibility' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imageName = time() . '.' . $request->image->extension();

        Storage::disk('post')->put($imageName, file_get_contents($request->image));

        $post = Post::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'description' => $request->description,
            'visibility' => $request->visibility,
            'imagePath' => $imageName,
            'uid' => auth()->user()->id,
        ]);

        return response()->json(
            [
                "status" => "success",
                "data" => $post,
            ]
        );
    }
}
