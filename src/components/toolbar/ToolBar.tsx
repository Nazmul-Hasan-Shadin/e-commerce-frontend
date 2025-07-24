
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
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

export const MyOnchangePlugin = (props: {
  onChange: (editorState: EditorState) => void;
}) => {
  const [editor] = useLexicalComposerContext();

  const { onChange } = props;

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [onChange, editor]);
  return null;
};

const HeadingToolBarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const handleClick = (tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"): void => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  };

  return (
    <div>
      {["h1", "h2", "h3", "h4"].map((tag, index) => (
        <button
          key={tag}
          className="mr-3"
          onClick={() => handleClick(tag as "h1" | "h2" | "h3" | "h4")}
        >
          {tag.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

const ListToolBarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const listTag = ["ol", "ul"];
  const handleClick = (tag: "ol" | "ul"): void => {
    if (tag == "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      return;
    }
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  return (
    <div>
      {listTag.map((tag, index) => (
        <button className="mr-3" key={tag} onClick={() => handleClick(tag)}>
          {tag.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export  const ToolBarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="flex gap-4">
      <HeadingToolBarPlugin />
      <ListToolBarPlugin />
    </div>
  );
};
