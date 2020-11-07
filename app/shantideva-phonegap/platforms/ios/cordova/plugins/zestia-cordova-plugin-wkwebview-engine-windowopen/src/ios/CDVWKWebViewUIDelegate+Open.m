#import "CDVWKWebViewUIDelegate+Open.h"

@implementation CDVWKWebViewUIDelegate (Open)
- (WKWebView *)webView:(WKWebView *)webView createWebViewWithConfiguration:(WKWebViewConfiguration *)configuration forNavigationAction:(WKNavigationAction *)navigationAction windowFeatures:(WKWindowFeatures *)windowFeatures {
    if (!navigationAction.targetFrame.isMainFrame) {
        NSURL *url = [[navigationAction request] URL];
        UIApplication *application = [UIApplication sharedApplication];

        if ([application canOpenURL:url]) {
            [application openURL:url];
        }
    }

    return nil;
}
@end
