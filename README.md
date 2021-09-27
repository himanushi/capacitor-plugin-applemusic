# capacitor-plugin-applemusic

It is in the development stage. Please do not use it.

## Install

```bash
npm install capacitor-plugin-applemusic
npx cap sync
```

## API

<docgen-index>

* [`echo(...)`](#echo)
* [`configure(...)`](#configure)
* [`isAuthorized()`](#isauthorized)
* [`authorize()`](#authorize)
* [`unauthorize()`](#unauthorize)
* [`setSong(...)`](#setsong)
* [`play()`](#play)
* [`stop()`](#stop)
* [`pause()`](#pause)
* [`currentPlaybackTime()`](#currentplaybacktime)
* [`seekToTime(...)`](#seektotime)
* [`addListener(...)`](#addlistener)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### echo(...)

```typescript
echo(options: { value: string; }) => any
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: string; }</code> |

**Returns:** <code>any</code>

--------------------


### configure(...)

```typescript
configure(options: { config: MusicKit.Config; }) => any
```

| Param         | Type                             |
| ------------- | -------------------------------- |
| **`options`** | <code>{ config: Config; }</code> |

**Returns:** <code>any</code>

--------------------


### isAuthorized()

```typescript
isAuthorized() => any
```

**Returns:** <code>any</code>

--------------------


### authorize()

```typescript
authorize() => any
```

**Returns:** <code>any</code>

--------------------


### unauthorize()

```typescript
unauthorize() => any
```

**Returns:** <code>any</code>

--------------------


### setSong(...)

```typescript
setSong(options: { songId: string; }) => any
```

| Param         | Type                             |
| ------------- | -------------------------------- |
| **`options`** | <code>{ songId: string; }</code> |

**Returns:** <code>any</code>

--------------------


### play()

```typescript
play() => any
```

**Returns:** <code>any</code>

--------------------


### stop()

```typescript
stop() => any
```

**Returns:** <code>any</code>

--------------------


### pause()

```typescript
pause() => any
```

**Returns:** <code>any</code>

--------------------


### currentPlaybackTime()

```typescript
currentPlaybackTime() => any
```

**Returns:** <code>any</code>

--------------------


### seekToTime(...)

```typescript
seekToTime(options: { playbackTime: number; }) => any
```

| Param         | Type                                   |
| ------------- | -------------------------------------- |
| **`options`** | <code>{ playbackTime: number; }</code> |

**Returns:** <code>any</code>

--------------------


### addListener(...)

```typescript
addListener(eventName: 'playbackStateDidChange', listenerFunc: PlaybackStateDidChangeListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>"playbackStateDidChange"</code>                                                                                                                                    |
| **`listenerFunc`** | <code>(state: { result: "none" \| "loading" \| "playing" \| "paused" \| "stopped" \| "ended" \| "seeking" \| "waiting" \| "stalled" \| "completed"; }) =&gt; void</code> |

**Returns:** <code>any</code>

--------------------


### Interfaces


#### PluginListenerHandle

| Prop         | Type                      |
| ------------ | ------------------------- |
| **`remove`** | <code>() =&gt; any</code> |

</docgen-api>
