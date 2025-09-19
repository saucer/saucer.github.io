
#include <all.hpp>
#include <saucer/smartview.hpp>

coco::stray start(saucer::application *)
{
    // ...
    webview->set_url("...");
    webview->embed(saucer::embedded::all());
    webview->serve("/index.html");
    // ...
}

