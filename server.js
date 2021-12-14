const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./news.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    default: true,
    oneofs: true,

};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

let news = [
    {id: "1", title: "Note 1", body: "Content 1", postImage: "newsPhoto1.jpg"},
    {id: "2", title: "Note 2", body: "Content 2", postImage: "newsPhoto2.jpg"},
];

server.addService(newsProto.NewsService.service, {
    getAllNews: (_, callbaack) => {
        callbaack(null, {news});
    },
    addNews: (call, callbaack) => {
        const _news = {id: Date.now(), ...call.request };
        news.push(_news);
        callbaack(null,_news);

    },
});


server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server running http://127.0.0.1:50051");
        server.start();
    }
);