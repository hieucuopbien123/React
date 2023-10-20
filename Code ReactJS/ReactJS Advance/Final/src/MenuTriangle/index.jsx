import React, { useState, useRef, useCallback } from "react";
import { SafeArea } from "./SafeArea";
import "./index.css";

// React Final / Tạo safe triangle cho context menu

const MenuTriangle = () => {
  return (
    <>
      <div></div>
      <div className="App">
        <div className="n-flex container">
          <div className="n-w-full n-bg-success-20 n-p-4">
            <h4>After</h4>
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <SafeAreaNestedOption />
              <li>Option 3</li>
              <li>Option 4</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
};

const NestedPlaceholder = () => (
  <div className="n-flex n-flex-row n-justify-between n-w-full n-gap-4">
    <div>Nested Option</div>
    <span role="img" aria-label="dropdown-indicator">
      ➡️
    </span>
  </div>
);

const SafeAreaNestedOption = () => {
  const [open, setOpen] = useState(false);
  const parent = useRef(null);
  const child = useRef(null);

  const getTop = useCallback(() => {
    const height = child.current?.offsetHeight;
    return height ? `-${height / 2 - 15}px` : 0;
  }, [child]);

  return (
    <li
      ref={parent}
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NestedPlaceholder />
      {/* Safe mouse area */}
      {/* This is where the magic will happen */}
      {open && parent.current && child.current && (
        <SafeArea anchor={parent.current} submenu={child.current} />
      )}

      {/* Nested elements as children */}
      <div
        style={{
          visibility: open ? "visible" : "hidden",
          position: "absolute",
          left: parent.current?.offsetWidth || 0,
          top: getTop()
        }}
        ref={child}
      >
        <ul>
          <li>Nested Option 1</li>
          <li>Nested Option 2</li>
          <li>Nested Option 3</li>
          <li>Nested Option 4</li>
        </ul>
      </div>
    </li>
  );
};

export default MenuTriangle;