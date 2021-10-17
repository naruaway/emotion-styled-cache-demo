import { renderToString } from "react-dom/server";
import styled from "@emotion/styled";
// @ts-ignore
import { __unsafe_useEmotionCache, EmotionCache } from "@emotion/react";
import { serializeStyles } from "@emotion/serialize";

const SERIALIZED_STYLE_CACHE = new Map<boolean, unknown>();

const MyStyledComponent = styled("div")((props: { myFlag: boolean }) => {
  const generateStyle = ({ myFlag }: { myFlag: boolean }) => ({
    color: "red",
    margin: "10px",
    border: myFlag ? "1px solid red" : "2px solid green",
    backgroundColor: "gold",
    opacity: 0.5,
    paddingLeft: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ":hover": {
      color: "purple",
      margin: "10px",
      border: myFlag ? "1px solid red" : "2px solid green",
      backgroundColor: "gold",
      opacity: 0.5,
      paddingLeft: "2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    ":focus": {
      color: "green",
      margin: "10px",
      border: "1px solid red",
      backgroundColor: "gold",
      opacity: 0.5,
      paddingLeft: "2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  if (!+process.env.WITH_SERIALIZED_STYLE_CACHE) {
    return generateStyle;
  }

  const emotionCache = __unsafe_useEmotionCache() as EmotionCache;
  if (!emotionCache) {
    return generateStyle;
  }

  const cachedValue = SERIALIZED_STYLE_CACHE.get(props.myFlag);
  if (cachedValue) {
    return cachedValue;
  }

  const serializedStyle = serializeStyles(
    [generateStyle],
    emotionCache.registered,
    props
  );
  SERIALIZED_STYLE_CACHE.set(props.myFlag, serializedStyle);
  return serializedStyle;
});

const MyWrapper = styled("div")({ margin: 0 });

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

const start = performance.now();

const result = renderToString(
  <MyWrapper>
    {range(3000).map((i) => (
      <MyStyledComponent key={i} myFlag={!!(i % 2)} />
    ))}
  </MyWrapper>
);

console.log(`Processing time: ${(performance.now() - start).toFixed(1)} ms`);
