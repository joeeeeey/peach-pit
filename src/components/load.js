// 延迟加载
import React from "react";

export const Load = props => {
  const { isLoading, error } = props;
  if (isLoading) return null;
  if (error)
    return <div>Sorry, there was a problem loading the component.</div>;
  return null;
};
