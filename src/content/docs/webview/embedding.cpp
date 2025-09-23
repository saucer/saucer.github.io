#include <saucer/smartview.hpp>
#include <saucer/embedded/all.hpp>

coco::stray start(saucer::application *)
{
    // ...
    webview->set_url("...");
    webview->embed(saucer::embedded::all());
    webview->serve("/index.html");
    // ...
}

