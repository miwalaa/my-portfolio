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

  const renderTextNode = (node: TextNode, index: number) => {
    let text: React.ReactNode = node.text;

    if (node.bold) text = <strong key={`bold-${index}`}>{text}</strong>;
    if (node.italic) text = <em key={`italic-${index}`}>{text}</em>;
    if (node.underline) text = <u key={`underline-${index}`}>{text}</u>;
    if (node.code) {
      text = (
        <code
          key={`code-${index}`}
          className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
        >
          {text}
        </code>
      );
    }

    return <span key={`text-${index}`}>{text}</span>;
  };

  const renderElementNode = (node: ElementNode, index: number) => {
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
      case "heading":
        return (
          <h2
            key={`h2-${index}`}
            className="text-3xl font-bold mt-8 mb-5 text-gray-800 dark:text-gray-100"
          >
            {children}
          </h2>
        );
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
    return (
      <div className="text-gray-500 dark:text-gray-400">
        No content available
      </div>
    );
  }

  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      {content.root.children.map((node, index) => (
        <React.Fragment key={`node-${index}`}>
          {renderElementNode(node as ElementNode, index)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default RichTextRender;
