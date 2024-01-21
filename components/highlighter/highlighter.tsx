"use client";

import React, { Suspense, useEffect, useState } from "react";
import Prism from "prismjs";
import ButtonHighliter from "./button-highlighter";
interface HighlighterProps {
  code?: string;
  language?: string;
  componentName?: string;
}
type SizeKey = "mobile" | "sm" | "md" | "lg" | "full";

const Highlighter = ({ code, language, componentName }: HighlighterProps) => {
  const [showPreview, setShowPreview] = useState(true);
  const [iframeWidth, setIframeWidth] = useState("100%");

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };
  const handleIframeWidthChange = (size: SizeKey) => {
    const sizes = {
      mobile: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      full: "100%",
    };
    setIframeWidth(sizes[size] || "100%");
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <div>
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">
          {componentName ? componentName : "Component Name"}
        </h1>
        <div className="flex justify-between ">
          <div className="flex gap-2 ">
            <ButtonHighliter
              onToggle={togglePreview}
              isPreviewing={showPreview}
            />
            <ButtonHighliter mode="copy" code={code} />
          </div>
          <ButtonHighliter
            mode="responsiveness"
            onSizeChange={handleIframeWidthChange}
          />
        </div>
        <div
          style={{ transition: "width 0.5s ease-in-out", width: iframeWidth }}
        >
          {showPreview ? (
            <div className="mt-10 h-[70vh] overflow-hidden rounded-xl border-2 border-b-4 border-r-4 border-slate-800 ">
              <Suspense fallback={<div>Loading Component...</div>}>
                <iframe
                  key={code}
                  srcDoc={`
                  <!doctype html>
                  <html>
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <script src="https://cdn.tailwindcss.com"></script>
                  </head>
                  <body>
                  <div class="flex justify-center w-full ">
                  ${code}
                  </div>
                  <script>
                  document.body.addEventListener('click', function(e) {
                    if(e.target.tagName === 'A') {
                      e.preventDefault();
                    }
                  });
                </script>
                  </body>
                  </html>
                `}
                  title="Component Preview"
                  width="100%"
                  height="100%"
                  className="w-full border-none "
                />
              </Suspense>
            </div>
          ) : (
            <div className="mt-10">
              <pre
                className={`language-${language} h-[70vh] max-h-[70vh] overflow-scroll rounded-xl border-2 border-b-4 border-r-4 border-slate-800`}
              >
                <code className={`language-${language}`}>{code}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Highlighter;