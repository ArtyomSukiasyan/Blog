import Parser from "rss-parser";

type BlogPost = {
  title: string;
  link: string;
  contentSnippet?: string;
  pubDate?: string;
};

const lichessUrl = "https://lichess.org/@/artiom1401/blog.atom"

export default async function LichessFeed() {
  const parser: Parser<{}, any> = new Parser({
    customFields: {
      item: [
        ["media:thumbnail", "thumbnail"],
        ["content", "content"],
      ],
    },
  });

  const feed = await parser.parseURL(lichessUrl);

  const posts: BlogPost[] = feed.items.map((item: any) => ({
    title: item.title,
    link: item.link,
    contentSnippet: item.contentSnippet,
    thumbnail:
      typeof item.thumbnail === "object"
        ? item.thumbnail.$?.url
        : item.thumbnail,
    pubDate: item.pubDate,
  }));

  return (
    <div>
      <h2>Chess Blog</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((item, i) => (
          <li
            key={i}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 16,
              marginBottom: 20,
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >

            <h3 style={{ margin: "0 0 8px 0" }}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#3b5998" }}
              >
                {item.title}
              </a>
            </h3>
            {item.pubDate && (
              <small style={{ color: "#666" }}>
                {new Date(item.pubDate).toLocaleDateString()}
              </small>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
