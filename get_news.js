const client = require("./client")

client.getAllNews({}, (error, news) => {
    if (error) throw error;
    console.log(news);
});

client.addNews(
    {
        title: "baslik 3",
        body: "içerik 3",
        postImage: "image3.jpeg",
    },
    (error, news) => {
        if (error) throw error;
        console.log("Successfully created news");
    }
);