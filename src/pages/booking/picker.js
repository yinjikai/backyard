import React from "react";
import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import TimeRange from "mobile-time-range-picker";

import "./picker.scss";
const containerTop = 15;
export default class TimeRangePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: 0,
      to: 0,
      time: "",
      scrollTop: 0
    };
    this.wrap = Taro.createRef();
  }

  renderHourView = () => {
    return Array(24)
      .fill("")
      .map((item, index) => {
        return (
          <View
            style={{ top: `${20 * 4 * index}px` }}
            className="hour-line-wrap"
          >
            <Text className="hour-text">{index}:00</Text>

            <View className="hour-line"></View>
          </View>
        );
      });
  };
  renderCurrentTimeView = () => {
    const hour = new Date().getHours();
    const min = new Date().getMinutes();
    const top = hour * 80 + (min / 15) * 20;
    return (
      <View
        className="current-time-line-wrap"
        style={{ top: `${top}px` }}
        id="currentTimeLine"
      >
        <Text className="current-time-text">
          {`${hour}`.padStart(2, "0") + ":" + `${min}`.padStart(2, "0")}
        </Text>
        <View className="current-time-line"></View>
      </View>
    );
  };
  renderFifTeenView = () => {
    return Array(96)
      .fill("")
      .map((item, index) => {
        if (index % 4 == 0) return "";
        return (
          <View style={{ top: `${20 * index}px` }} className="fifteenLine" />
        );
      });
  };
  generateTimeRange = () => {
    const { from, to } = this.state;
    let fromTime,
      toTime,
      hour,
      min,
      _hour,
      _min = 0;
    if (from > to) {
      //向上
      hour = Math.floor(to / 80);
      min = ((from % 80) / 20) * 15;
      _hour = Math.floor(from / 80);
      _min = ((from % 80) / 20) * 15;
    } else {
      //向下

      hour = Math.floor(from / 80);
      min = ((from % 80) / 20) * 15;
      _hour = Math.floor(to / 80);
      _min = ((to % 80) / 20) * 15;
    }
    fromTime = this.formatTime(hour, min);
    toTime = this.formatTime(_hour, _min);
    this.setState({
      time: `${fromTime}~${toTime}`
    });
  };
  formatTime = (hour, min) => {
    return `${hour}`.padStart(2, "0") + `:` + `${min}`.padStart(2, "0");
  };
  checkTime = time => {
    const { from: _from } = this.state;
    const { disableTime } = this.props;
    let result = true;
    for (let i = 0; i < disableTime.length; i++) {
      const item = disableTime[i];
      const { 0: from, 1: to } = item.split("~");
      const start = +from.slice(0, 2) * 80 + (+from.slice(-2) / 15) * 20;
      const end = +to.slice(0, 2) * 80 + (+to.slice(-2) / 15) * 20;
      if (
        (time > start && time < end) ||
        (_from <= start && time >= end && _from !== 0 && time !== 0)
      ) {
        result = false;
        break;
      }
    }

    return result;
  };
  handleTouchMove = e => {
    const { scrollTop } = this.state;
    const pageY = e.touches[0].pageY - containerTop + scrollTop;
    const _to =
      pageY % 20 >= 10
        ? Math.ceil(pageY / 20) * 20
        : Math.floor(pageY / 20) * 20;
    if (!this.checkTime(_to)) {
      return;
    }
    this.setState(
      {
        to: _to
      },
      () => {
        this.generateTimeRange();
      }
    );
  };
  renderBg = () => {
    return <View className="bg">{this.renderFifTeenView()}</View>;
  };
  handleTouchStart = e => {
    e.stopPropagation();
    const { scrollTop } = this.state;
    const pageY = e.touches[0].pageY - containerTop + scrollTop;
    const _from =
      pageY % 20 >= 10
        ? Math.ceil(pageY / 20) * 20
        : Math.floor(pageY / 20) * 20;
    if (!this.checkTime(_from)) return false;

    this.setState(
      {
        from: _from,
        to: _from + 20
      },
      () => {
        this.generateTimeRange();
      }
    );
  };
  handleCancel = e => {
    e.stopPropagation();
    const { handleCancel } = this.props;
    if (typeof handleCancel === "function") {
      handleCancel();
    }
    this.handleReset();
  };
  handleSubmit = e => {
    e.stopPropagation();
    const { time } = this.state;
    const { onChange } = this.props;
    if (typeof onChange === "function") {
      onChange(time);
    }
    this.handleReset();
  };
  handleReset = () => {
    this.setState({
      from: 0,
      to: 0
    });
  };
  renderDisableTime = () => {
    const { disableTime } = this.props;
    return (
      disableTime &&
      disableTime.map(item => {
        const { 0: from, 1: to } = item.split("~");
        const start = +from.slice(0, 2) * 80 + (+from.slice(-2) / 15) * 20;
        const end = +to.slice(0, 2) * 80 + (+to.slice(-2) / 15) * 20;
        return (
          <View
            className="disabled-time"
            style={{ top: `${start}px`, height: `${end - start}px` }}
          >
            该时段不可用
          </View>
        );
      })
    );
  };
  handleBtnTouchStart = e => {
    e.stopPropagation();
  };
  renderSelectedRange = () => {
    const { from, to, time } = this.state;
    let top,
      height = 0;
    if (from > to && from - to > 20) {
      //向上拖动
      top = to;
      height = from - to;
    } else {
      //向下拖动
      top = from;
      height = to - from;
    }
    return (
      <View
        className="selected-area"
        style={{
          top: `${top}px`,
          height: `${height}px`,
          display: to == 0 ? "none" : "block"
        }}
      >
        {time}
        <View className="submit-btn">
          <Text
            onTouchEnd={this.handleCancel}
            onTouchStart={this.handleBtnTouchStart}
            className="btn"
          >
            取消
          </Text>
          <Text
            onTouchEnd={this.handleSubmit}
            onTouchStart={this.handleBtnTouchStart}
            className="btn"
          >
            预约
          </Text>
        </View>
      </View>
    );
  };
  onScroll = e => {
    e.stopPropagation();
    this.setState({ scrollTop: e.target.scrollTop });
  };
  render() {
    return (
      <ScrollView
        className="scrollview"
        scrollY
        scrollWithAnimation
        scrollIntoView={"currentTimeLine"}
        scrollTop={0}
        style={{ height: "100vh" }}
        // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
        onScroll={this.onScroll}
      >
        <View
          ref={this.wrap}
          className="wrap"
          onTouchMove={this.handleTouchMove}
          onTouchStart={this.handleTouchStart}
        >
          {this.renderBg()}
          {this.renderHourView()}
          {this.renderCurrentTimeView()}
          {this.renderSelectedRange()}
          {this.renderDisableTime()}
        </View>
      </ScrollView>
    );
  }
}
