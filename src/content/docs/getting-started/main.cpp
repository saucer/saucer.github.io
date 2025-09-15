#include <print>
#include <saucer/smartview.hpp>

coco::stray start(saucer::application *app)
{
    auto window  = saucer::window::create(app).value();
    auto webview = saucer::smartview<>::create({.window = window});


    window->set_title("Hello World!");


    webview->expose("call_me", [&](double a, double b)
    {
        std::println("Called with: a = {}, b = {}", a, b);
        return a + b;
    });


    webview->expose("call_me_too", [&]() -> coco::task<double>
    {

        auto random = co_await webview->evaluate<double>("Math.random()");
        std::println("Random: {}", random);
        co_return random;
    });

    webview->set_url("https://saucer.app");

    window->show();


    co_await app->finish();
}

int main()
{
    return saucer::application::create({.id = "hello-world"})->run(start);
}
