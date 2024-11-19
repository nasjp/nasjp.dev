import { MDXRemote } from "next-mdx-remote/rsc";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const getLanguageFromFilename = (filename: string): string => {
  const extensionMap: { [key: string]: string } = {
    js: "javascript",
    ts: "typescript",
    py: "python",
    rb: "ruby",
    java: "java",
    cpp: "cpp",
    cs: "csharp",
    go: "go",
    rs: "rust",
    php: "php",
    html: "html",
    css: "css",
    json: "json",
    yml: "yaml",
    yaml: "yaml",
    md: "markdown",
    sh: "bash",
    bash: "bash",
    sql: "sql",
  };

  const specialCases: { [key: string]: string } = {
    Dockerfile: "dockerfile",
    Makefile: "makefile",
    package: "json",
  };

  if (specialCases[filename]) {
    return specialCases[filename];
  }

  const ext = filename.split(".").pop()?.toLowerCase();
  return ext ? extensionMap[ext] || ext : "";
};

const components = {
  code: (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }) => {
    return (
      <code
        className="not-prose bg-gray-100 text-red-500 text-sm py-1 px-2 rounded-md mx-2 break-all"
        {...props}
      />
    );
  },
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  pre: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\S+)/.exec(children.props.className || "");

    let displayLanguage = "";
    let displayText = "";

    if (match) {
      const [, languageAndFilename] = match;
      const parts = languageAndFilename.split(".");

      if (parts.length > 1) {
        displayLanguage = parts.pop() || "";
        displayText = languageAndFilename;
      } else {
        displayText = languageAndFilename;
        displayLanguage = getLanguageFromFilename(languageAndFilename);
      }
    }

    return !inline ? (
      <div className="relative">
        {displayText && (
          <div className="not-prose absolute top-0 right-0 bg-gray-200 px-2 py-1 text-xs font-mono rounded-bl">
            {displayText}
          </div>
        )}
        <SyntaxHighlighter
          style={base16AteliersulphurpoolLight}
          language={displayLanguage}
          PreTag="div"
          customStyle={{ paddingTop: "2rem" }}
          className="not-prose"
          {...props}
        >
          {String(children.props.children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className="bg-gray-200 text-red-500" {...props}>
        {children}
      </code>
    );
  },
};

interface ContentProps {
  source: string;
}

export default async function Content({ source }: ContentProps) {
  return <MDXRemote source={source} components={components} />;
}
