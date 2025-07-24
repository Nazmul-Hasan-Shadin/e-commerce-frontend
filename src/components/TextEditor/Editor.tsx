"use client";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import {
  $createTextNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  EditorState,
  ParagraphNode,
} from "lexical";
import React, { useEffect } from "react";
import { $createHeadingNode, HeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListItemNode,
  ListNode,
} from "@lexical/list";
import { MyOnchangePlugin, ToolBarPlugin } from "../toolbar/ToolBar";

function onError(error) {
  console.error(error);
}
let theme = {
  heading: {
    h1: "text-3xl font-bold my-4",
    h2: "text-2xl font-semibold my-3",
    h3: "text-xl font-medium my-2",
  },
};
const initialConfig = {
  namespace: "MyEditor",
  theme,
  onError,
  nodes: [HeadingNode, ListNode, ListItemNode, ParagraphNode],
};



//====================main component================

const Editor = () => {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolBarPlugin />
      <RichTextPlugin // for bold and italic
        contentEditable={
          <ContentEditable
            className="h-[300px] border list-disc list-inside"
            aria-placeholder={"Enter some text..."}
            placeholder={
              <div className="absolute top-5">Enter some text...</div>
            }
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />

      <MyOnchangePlugin onChange={(editorState) => console.log(editorState)} />

      <ListPlugin />

      {/* <AutoFocusPlugin /> */}
    </LexicalComposer>
  );
};

export default Editor;
