mod utils;

use wasm_bindgen::prelude::*;
use rand::{thread_rng};
use rand::seq::SliceRandom;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, wasm!");
}

#[wasm_bindgen]
pub fn shuffle(str:String) ->String {
    let mut  _array: Vec<i32> = serde_json::from_str(&*str).unwrap();
    _array.shuffle(&mut thread_rng());
    serde_json::to_string(&_array).unwrap()
}


#[wasm_bindgen]
pub fn batch_shuffle(array:String) -> String {
    let mut  _array: Vec<Vec<i32>> = serde_json::from_str(&*array).unwrap();
    let length = _array.len();
    let mut index = 0;
    while index<length {
        _array[index].shuffle(&mut thread_rng());
        index+=1;
    }
    serde_json::to_string(&_array).unwrap()
}

