# Emotion styled API serialized style cache demo

After running `npm ci`, you can test 3 variants to see their runtime costs (I used Node.js v16.11.1):

```
# In my machine this took 40.3 ms
node ./dist/main.js

# In my machine this took 30.6ms
WITH_SERIALIZED_STYLE_CACHE=1 node ./dist/main.js

# In my machine this took 23.5ms
WITH_SERIALIZED_STYLE_CACHE=1 EMOTION_SINGLE_FUNCTION_SPECIAL_HANDLING=1 node ./dist/main.js
```

From these results, you can see that adding a special handling ([done in the patch inside this repo](./patches/)) for `serializeStyles` in `@emotion/serialize` is helpful to implement possibly efficient caching strategy in UI libraries.
