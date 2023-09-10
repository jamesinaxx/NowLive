mod utils;

use base64::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
/// Downloads the specified image url and converts it into a base64 url
pub async fn download_image(url: String) -> String {
    let download = reqwest::get(url).await.unwrap().bytes().await.unwrap();
    BASE64_URL_SAFE.encode(download)
}
