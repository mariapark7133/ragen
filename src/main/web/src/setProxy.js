const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        createProxyMiddleware(
            ["/ws-stomp","/sub"],
            {
                //REACT_APP_API_URL=172.16.0.33:80
                target: `http://localhost:8080`,
                ws: true,
                router: {
                    "/ws-stomp": `ws://localhost:8080`,
                    "/sub": `ws://localhost:8080`,
                },
            }
        )
    );
};
