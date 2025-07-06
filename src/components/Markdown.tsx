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
  a: (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }) => {
    return (
      <a className="text-blue-500 underline hover:text-blue-700" {...props} />
    );
  },
  code: (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }) => {
    return (
      <code
        className="not-prose bg-gray-100 text-red-500 text-xs sm:text-sm py-1 px-2 rounded-md mx-1 sm:mx-2 my-1 break-all inline-block"
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
      <div className="relative overflow-x-auto">
        {displayText && (
          <div className="not-prose absolute top-0 right-0 bg-gray-200 px-1 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono rounded-bl z-10">
            {displayText}
          </div>
        )}
        <SyntaxHighlighter
          style={base16AteliersulphurpoolLight}
          language={displayLanguage}
          PreTag="div"
          customStyle={{ 
            paddingTop: "2rem", 
            fontSize: "0.75rem",
            lineHeight: "1rem",
            "@media (min-width: 640px)": {
              fontSize: "0.875rem",
              lineHeight: "1.25rem"
            }
          }}
          className="not-prose min-w-0"
          {...props}
        >
          {String(children.props.children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className="bg-gray-200 text-red-500 text-xs sm:text-sm" {...props}>
        {children}
      </code>
    );
  },
};

interface ContentProps {
  source: string;
}

export const Markdown = ({ source }: ContentProps) => {
  return <MDXRemote source={source} components={components} />;
};
