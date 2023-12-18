import React, { useEffect, useState } from "react";
import "./Tabs.css";

export default function Tabs(props) {
  return (
    <div className="Tabs-wrapper">
      <div className="Tabs-btn-wrapper">
        <button
          style={props.TabStyleLeft}
          onClick={props.handleTabLeft}
          className="TabsBtn Tab-one"
        >
          {props.TabTitleLeft}
        </button>
        <button
          style={props.TabStyleRight}
          onClick={props.handleTabRight}
          className="TabsBtn"
        >
          {props.TabTitleRight}
        </button>
      </div>
    </div>
  );
}
