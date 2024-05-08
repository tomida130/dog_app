<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class FavoriteController extends Controller
{
    public function index(){
        $user = Auth::user();
        $favorites = $user->favorites;
        $details = [];

        foreach($favorites as $favorite){
            // $details = $favorite -> dog_img;
            $details[] = array_merge(['dog_img' => $favorite -> dog_img, 'id' => $favorite -> id]);
        }

        return response()->json( $details);
    }

    public function toggleFavorite(Request $request){

        $validateData = $request->validate([
            "dog_img" => 'required|string',
        ]);

        $existingFavorite = Favorite::where('user_id', Auth::id())
            ->where('dog_img', $validateData['dog_img'])
            ->first();
        
        
        //お気に入りが存在する場合の処理
        if($existingFavorite) {
            $existingFavorite->delete();
            return response()->json(["status" => "removed"]);

        //お気に入りが存在しない場合の処理
        } else {
            Favorite::create([
                'dog_img' => $validateData['dog_img'],
                'user_id' => Auth::id(),
            ]);
            return response()->json(["status" => "added"]);
        }
        
       
    }
    public function checkFavoriteStatus(Request $request){
        $validateData = $request->validate([
            "dog_img" => 'required|string',
        ]);

        $isFavorite = Favorite::where('user_id', Auth::id())
        ->where('dog_img', $validateData['dog_img'])
        ->exists();

        return response()->json($isFavorite);
    }
}
