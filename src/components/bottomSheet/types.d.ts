import type React from 'react';
import type { ViewStyle, Insets } from 'react-native';
import type Animated from 'react-native-reanimated';
import type { PanGestureHandlerProps } from 'react-native-gesture-handler';
import type { BottomSheetHandleProps } from '../bottomSheetHandle';
import type { BottomSheetBackdropProps } from '../bottomSheetBackdrop';
import type { BottomSheetBackgroundProps } from '../bottomSheetBackground';
import type { BottomSheetFooterProps } from '../bottomSheetFooter';
import type {
  ANIMATION_SOURCE,
  KEYBOARD_BEHAVIOR,
  KEYBOARD_BLUR_BEHAVIOR,
  KEYBOARD_INPUT_MODE,
} from '../../constants';
import type { GestureEventsHandlersHookType } from '../../types';

export interface BottomSheetProps
  extends BottomSheetAnimationConfigs,
    Partial<
      Pick<
        PanGestureHandlerProps,
        | 'activeOffsetY'
        | 'activeOffsetX'
        | 'failOffsetY'
        | 'failOffsetX'
        | 'waitFor'
        | 'simultaneousHandlers'
      >
    > {
  //#region configuration
  /**
   * Initial snap point index, provide `-1` to initiate bottom sheet in closed state.
   * @type number
   * @default 0
   */
  index?: number;
  /**
   * Points for the bottom sheet to snap to. It accepts array of number, string or mix.
   * String values should be a percentage.
   * @example
   * snapPoints={[200, 500]}
   * snapPoints={[200, '%50']}
   * snapPoints={[-1, '%100']}
   * @type Array<string | number>
   */
  snapPoints:
    | Array<string | number>
    | Animated.SharedValue<Array<string | number>>;
  /**
   * Defines how violently sheet has to stopped while over dragging.
   * @type number
   * @default 2.5
   */
  overDragResistanceFactor?: number;
  /**
   * Defines whether the bottom sheet is attached to the bottom or no.
   * @type boolean
   * @default false
   */
  detached?: boolean;
  /**
   * Enable content panning gesture interaction.
   * @type boolean
   * @default true
   */
  enableContentPanningGesture?: boolean;
  /**
   * Enable handle panning gesture interaction.
   * @type boolean
   * @default true
   */
  enableHandlePanningGesture?: boolean;
  /**
   * Enable over drag for the sheet.
   * @type boolean
   * @default true
   */
  enableOverDrag?: boolean;
  /**
   * Enable pan down gesture to close the sheet.
   * @type boolean
   * @default false
   */
  enablePanDownToClose?: boolean;
  /**
   * To start the sheet closed and snap to initial index when it's mounted.
   * @type boolean
   * @default true
   */
  animateOnMount?: boolean;
  //#endregion

  //#region layout
  /**
   * Handle height helps to calculate the internal container and sheet layouts,
   * if `handleComponent` is provided, the library internally will calculate its layout,
   * unless `handleHeight` is provided.
   * @type number
   */
  handleHeight?: number | Animated.SharedValue<number>;
  /**
   * Container height helps to calculate the internal sheet layouts,
   * if `containerHeight` not provided, the library internally will calculate it,
   * however this will cause an extra re-rendering.
   * @type number | Animated.SharedValue<number>;
   */
  containerHeight?: number | Animated.SharedValue<number>;
  /**
   * Content height helps dynamic snap points calculation.
   * @type number | Animated.SharedValue<number>;
   */
  contentHeight?: number | Animated.SharedValue<number>;
  /**
   * Container offset helps to accurately detect container offsets.
   * @type Animated.SharedValue<number>;
   */
  containerOffset?: Animated.SharedValue<Required<Insets>>;
  /**
   * Top inset value helps to calculate percentage snap points values,
   * usually comes from `@react-navigation/stack` hook `useHeaderHeight` or
   * from `react-native-safe-area-context` hook `useSafeArea`.
   * @type number
   * @default 0
   */
  topInset?: number;
  /**
   * Bottom inset value helps to calculate percentage snap points values,
   * usually comes from `react-native-safe-area-context` hook `useSafeArea`.
   * @type number
   * @default 0
   */
  bottomInset?: number;
  //#endregion

  //#region keyboard
  /**
   * Defines the keyboard appearance behavior.
   * @enum
   * - `interactive`: offset the sheet by the size of the keyboard.
   * - `extend`: extend the sheet to its maximum snap point.
   * - `fillParent`: extend the sheet to fill parent.
   * @type `interactive` | `extend` | `fillParent`
   * @default interactive
   */
  keyboardBehavior?: keyof typeof KEYBOARD_BEHAVIOR;
  /**
   * Defines the keyboard blur behavior.
   * - `none`: do nothing.
   * - `restore`: restore sheet position.
   */
  keyboardBlurBehavior?: keyof typeof KEYBOARD_BLUR_BEHAVIOR;
  /**
   * Defines keyboard input mode for Android only.
   * @link {https://developer.android.com/guide/topics/manifest/activity-element#wsoft}
   * @type `adjustPan` | `adjustResize`
   * @default `adjustPan`
   */
  android_keyboardInputMode?: keyof typeof KEYBOARD_INPUT_MODE;

  //#endregion

  /**
   * View style to be applied at the sheet container,
   * it also could be an Animated Style.
   * @type Animated.AnimateStyle<ViewStyle>
   * @default undefined
   */
  style?: Animated.AnimateStyle<
    Omit<
      ViewStyle,
      | 'flexDirection'
      | 'position'
      | 'top'
      | 'left'
      | 'bottom'
      | 'right'
      | 'opacity'
      | 'transform'
    >
  >;
  /**
   * Custom hook to provide pan gesture events handler, which will allow advance and
   * customize handling for pan gesture.
   * @warning this is an experimental feature and the hook signature can change without a major version bump.
   * @type GestureEventsHandlersHookType
   * @default useGestureEventsHandlersDefault
   */
  gestureEventsHandlersHook?: GestureEventsHandlersHookType;

  //#region animated nodes
  /**
   * Animated value to be used as a callback of the position node internally.
   * @type Animated.Value<number>
   */
  animatedPosition?: Animated.SharedValue<number>;
  /**
   * Animated value to be used as a callback for the position index node internally.
   * @type Animated.Value<number>
   */
  animatedIndex?: Animated.SharedValue<number>;
  //#endregion

  //#region callbacks
  /**
   * Callback when the sheet position changed to a provided point.
   *
   * @type (index: number) => void;
   */
  onChange?: (index: number) => void;
  /**
   * Callback when the sheet close.
   *
   * @type () => void;
   */
  onClose?: () => void;
  /**
   * Callback when the sheet about to animate to a new position.
   *
   * @type (fromIndex: number, toIndex: number) => void;
   */
  onAnimate?: (fromIndex: number, toIndex: number) => void;
  //#endregion

  //#region components
  /**
   * Component to be placed as a sheet handle.
   * @see {BottomSheetHandleProps}
   * @type React.FC\<BottomSheetHandleProps\>
   */
  handleComponent?: React.FC<BottomSheetHandleProps> | null;
  /**
   * Component to be placed as a sheet backdrop.
   * @see {BottomSheetBackdropProps}
   * @type React.FC\<BottomSheetBackdropProps\>
   * @default null
   */
  backdropComponent?: React.FC<BottomSheetBackdropProps> | null;
  /**
   * Component to be placed as a background.
   * @see {BottomSheetBackgroundProps}
   * @type React.FC\<BottomSheetBackgroundProps\>
   */
  backgroundComponent?: React.FC<BottomSheetBackgroundProps> | null;
  /**
   * Component to be placed as a footer.
   * @see {BottomSheetFooterProps}
   * @type React.FC\<BottomSheetFooterProps\>
   */
  footerComponent?: React.FC<BottomSheetFooterProps>;
  /**
   * A scrollable node or normal view.
   * @type React.ReactNode[] | React.ReactNode
   */
  children: (() => React.ReactNode) | React.ReactNode[] | React.ReactNode;
  //#endregion

  //#region private
  /**
   * An indicator whether if the sheet running in a modal.
   * @type boolean
   */
  $modal?: boolean;
  //#endregion
}

export interface BottomSheetAnimationConfigs {
  /**
   * Animation configs, this could be created by:
   * - `useBottomSheetSpringConfigs`
   * - `useBottomSheetTimingConfigs`
   * @type Animated.WithSpringConfig | Animated.WithTimingConfig
   */
  animationConfigs?: Animated.WithSpringConfig | Animated.WithTimingConfig;
}

export type AnimateToPositionType = (
  position: number,
  source: ANIMATION_SOURCE,
  velocity?: number,
  configs?: Animated.WithTimingConfig | Animated.WithSpringConfig
) => void;
