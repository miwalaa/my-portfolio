"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type TextNode = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  format?: number; // Lexical uses bitwise format flags
};

type ElementNode = {
  type: string;
  children: (ElementNode | TextNode)[];
  format?: string | number;
  indent?: number;
  version?: number;
  url?: string;
  alt?: string;
  caption?: string;
};

type RootNode = {
  type: "root";
  children: ElementNode[];
  format?: string | number;
  indent?: number;
  version?: number;
  direction?: string;
};

type RichTextContent = {
  root: RootNode;
};

type Props = {
  content: RichTextContent;
  className?: string;
};

const RichTextRender: React.FC<Props> = ({ content, className = "" }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderTextNode = (node: TextNode, index: number): React.ReactNode => {
    let text: React.ReactNode = node.text;

    // Handle Lexical format flags (bitwise)
    // 1 = bold, 2 = italic, 4 = strikethrough, 8 = underline, 16 = code
    const format = node.format || 0;
    const isBold = node.bold || (format & 1) !== 0;
    const isItalic = node.italic || (format & 2) !== 0;
    const isUnderline = node.underline || (format & 8) !== 0;
    const isCode = node.code || (format & 16) !== 0;
    const isStrikethrough = (format & 4) !== 0;

    if (isBold) text = <strong key={`bold-${index}`}>{text}</strong>;
    if (isItalic) text = <em key={`italic-${index}`}>{text}</em>;
    if (isUnderline) text = <u key={`underline-${index}`}>{text}</u>;
    if (isStrikethrough) text = <s key={`strike-${index}`}>{text}</s>;
    if (isCode) {
      text = (
        <code
          key={`code-${index}`}
          className="bg-gray-900 text-green-400 px-2 py-1 rounded text-sm font-mono border border-gray-800"
        >
          {text}
        </code>
      );
    }

    return <span key={`text-${index}`}>{text}</span>;
  };

  const renderElementNode = (node: ElementNode, index: number): React.ReactNode => {
    if (!node.children) return null;

    const children = node.children
      .map((child, i) => {
        if (child.type === "text") {
          return renderTextNode(child as TextNode, i);
        }
        return renderElementNode(child as ElementNode, i);
      })
      .filter(Boolean);

    switch (node.type) {
      case "heading": {
        const rawTag = (node as any).tag || "h2";
        const validHeadings = ["h1", "h2", "h3", "h4", "h5", "h6"];
        const tag = validHeadings.includes(rawTag) ? rawTag : "h2";
        
        const sizeClasses: Record<string, string> = {
          h1: "text-4xl font-bold mt-10 mb-6",
          h2: "text-3xl font-bold mt-8 mb-5",
          h3: "text-2xl font-bold mt-6 mb-4",
          h4: "text-xl font-bold mt-5 mb-3",
          h5: "text-lg font-bold mt-4 mb-2",
          h6: "text-base font-bold mt-3 mb-2",
        };
        
        return React.createElement(
          tag,
          {
            key: `${tag}-${index}`,
            className: `${sizeClasses[tag] || sizeClasses.h2} text-gray-800 dark:text-gray-100`,
          },
          children
        );
      }
      case "paragraph":
        return (
          <p
            key={`p-${index}`}
            className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            {children}
          </p>
        );
      case "listitem":
        return (
          <li key={`li-${index}`} className="my-2 ml-6 pl-2">
            {children}
          </li>
        );
      case "list":
        return (
          <ul key={`ul-${index}`} className="list-disc pl-6 my-4 space-y-2">
            {children}
          </ul>
        );
      case "link":
        return (
          <a
            key={`a-${index}`}
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {children}
          </a>
        );
      case "image":
        // Handle different possible image node structures
        const imageUrl =
          node.url ||
          (node as any).src ||
          (node as any).custom?.url ||
          (node.children?.[0] as any)?.url;

        if (!imageUrl) {
          console.warn(
            "Image node found but no URL could be determined:",
            node
          );
          return null;
        }

        const altText =
          node.alt ||
          (node as any).altText ||
          (node as any).custom?.alt ||
          "Blog post image";

        const caption =
          node.caption || (node as any).custom?.caption || (node as any).title;

        return (
          <div key={`img-${index}`} className="my-8">
            <div className="relative w-full h-96 rounded-xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={altText}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                priority={index < 2}
              />
            </div>
            {caption && (
              <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
                {caption}
              </p>
            )}
          </div>
        );
      case "quote":
        return (
          <blockquote
            key={`blockquote-${index}`}
            className="border-l-4 border-green-500 dark:border-green-400 pl-4 my-6 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-r"
          >
            {children}
          </blockquote>
        );
      case "code":
        return (
          <pre
            key={`pre-${index}`}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-6 text-sm"
          >
            <code className="font-mono">{children}</code>
          </pre>
        );
      default:
        return (
          <div key={`div-${index}`} className="my-4">
            {children}
          </div>
        );
    }
  };

  if (!isMounted) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!content?.root?.children?.length) {
    console.error("RichTextRender: No content or invalid structure", content);
    return (
      <div className="text-gray-500 dark:text-gray-400">
        No content available
      </div>
    );
  }

  try {
    return (
      <div className={`prose dark:prose-invert max-w-none ${className}`}>
        {content.root.children.map((node, index) => (
          <React.Fragment key={`node-${index}`}>
            {renderElementNode(node as ElementNode, index)}
          </React.Fragment>
        ))}
      </div>
    );
  } catch (error) {
    console.error("RichTextRender: Error rendering content", error, content);
    return (
      <div className="text-red-500 dark:text-red-400 p-4 border border-red-500 rounded">
        Error rendering content. Check console for details.
      </div>
    );
  }
};

export default RichTextRender;
