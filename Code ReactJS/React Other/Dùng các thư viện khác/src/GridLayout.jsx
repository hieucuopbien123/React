// # Basic / Dùng prop-types
// # Các thư viện components / react-grid-layout

// ## Các thứ quan trọng khác / # Dùng các thư viện chức năng / Dùng lodash

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ShowcaseLayout = (props) => {
  const [state, setState] = useState({
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    layouts: { lg: props.initialLayout }
  });

  useEffect(() => {
    setState({
      ...state,
      mounted: true
    })
  }, []);

  const generateDOM = () => {
    return _.map(state.layouts.lg, function(l, i) { // Đơn giản như map bth là duyệt qua state.layouts.lg
      return (
        <div key={i} className={l.static ? "static" : ""}>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  }

  const onBreakpointChange = (breakpoint) => {
    setState({
      ...state,
      currentBreakpoint: breakpoint
    });
  }

  const onCompactTypeChange = () => {
    const { compactType: oldCompactType } = state;
    const compactType =
      oldCompactType === "horizontal" ? "vertical"
        : oldCompactType === "vertical" ? null : "horizontal";
    setState({ 
      ...state,
      compactType 
    });
  }

  const onLayoutChange = (layout, layouts) => {
    props.onLayoutChange(layout, layouts);
  }

  const onNewLayout = () => {
    this.setState({
      ...state,
      layouts: { lg: generateLayout() }
    });
  }

  return (
    <div>
      <div>
        Current Breakpoint: {state.currentBreakpoint} ({
          props.cols[state.currentBreakpoint]
        }{" "}
        columns)
      </div>
      <div>
        Compaction type:{" "}
        {/* Viết hoa string */}
        {_.capitalize(state.compactType) || "No Compaction"}
      </div>
      <button onClick={onNewLayout}>Generate New Layout</button>
      <button onClick={onCompactTypeChange}>
        Change Compaction Type
      </button>

      {/* Tất cả mọi thứ của thư viện này chỉ cần chú ý cái ResponsiveReactGridLayout và các class */}
      <ResponsiveReactGridLayout
        {...props}

        // Truyền vào 1 layouts là 1 list object items có các trường x, y, w, h, i, static(boolean)
        // i là index của các item, bằng 1 cách nào đó nó sẽ sắp xếp các item theo index sao cho vừa với 
        // container khoảng trống. Nếu truyền i toàn là 1 chẳng hạn thì các item sẽ dít vào cùng 1 cột vì nó coi
        // cùng 1 item
        layouts={state.layouts}
        
        // Khi màn hình thay đổi kích thước
        onBreakpointChange={onBreakpointChange}

        // Khi ta move các object bên trong làm layout thay đổi
        onLayoutChange={onLayoutChange}

        // 1 WidthProvider option
        measureBeforeMount={false}

        // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
        // and set `measureBeforeMount={true}`.
        useCSSTransforms={state.mounted}

        // Truyền vào compactType
        compactType={state.compactType}
        preventCollision={!state.compactType}
      >
        {/* Truyền vào các thẻ con ở bên trong, kích thước của nó k được fix */}
        {generateDOM()}
      </ResponsiveReactGridLayout>

    </div>
  );
}

ShowcaseLayout.propTypes = {
  onLayoutChange: PropTypes.func.isRequired
};
ShowcaseLayout.defaultProps = {
  className: "layout",
  rowHeight: 30,
  onLayoutChange: function() {},
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  initialLayout: generateLayout()
};

function generateLayout() {
  // Hàm _.range(start, end, step) như vòng for(int i = start, i < end; i+=step) của C++
  return _.map(_.range(0, 25), function(item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      // Hàm _.random(min, max, float: boolean)
      x: (_.random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
}


const ExampleLayout = () => {
  const [state, setState] = useState({
    layout: []
  });

  const onLayoutChange = (layout) => {
    setState({ 
      ...state,
      layout: layout 
    });
  }

  const stringifyLayout = () => {
    return state.layout.map(function(l) {
      return (
        <div className="layoutItem" key={l.i}>
          <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
        </div>
      );
    });
  }

  return (
    <div>
      <div className="layoutJSON">
        Displayed as <code>[x, y, w, h]</code>:
        <div className="columns">{stringifyLayout()}</div>
      </div>
      <ShowcaseLayout onLayoutChange={onLayoutChange} />
    </div>
  );
}

export default ExampleLayout;
