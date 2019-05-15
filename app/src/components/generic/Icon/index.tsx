import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

export type GenericIconName =
  | 'account_circle'
  | 'add_shopping_cart'
  | 'alarm'
  | 'alarm_add'
  | 'alarm_off'
  | 'alarm_on'
  | 'assessment'
  | 'autorenew'
  | 'backup'
  | 'book'
  | 'bookmark'
  | 'bookmarks'
  | 'calendar_today'
  | 'contact_support'
  | 'copyright'
  | 'credit_card'
  | 'date_range'
  | 'delete'
  | 'description'
  | 'done'
  | 'done_all'
  | 'drag_indicator'
  | 'event'
  | 'exit_to_app'
  | 'explore'
  | 'favorite'
  | 'favorite_border'
  | 'feedback'
  | 'help'
  | 'history'
  | 'home'
  | 'hourglass_empty'
  | 'hourglass_full'
  | 'label'
  | 'label_off'
  | 'launch'
  | 'list'
  | 'open_in_browser'
  | 'print'
  | 'receipt'
  | 'redeem'
  | 'remove_shopping_cart'
  | 'report_problem'
  | 'schedule'
  | 'search'
  | 'settings'
  | 'shopping_basket'
  | 'shopping_cart'
  | 'today'
  | 'timeline'
  | 'add_alert'
  | 'error'
  | 'error_outline'
  | 'notification_important'
  | 'warning'
  | 'playlist_add'
  | 'playlist_add_check'
  | 'playlist_play'
  | 'queue'
  | 'shuffle'
  | 'skip_next'
  | 'skip_previous'
  | 'add'
  | 'add_circle'
  | 'add_circle_outline'
  | 'archive'
  | 'ballot'
  | 'block'
  | 'clear'
  | 'create'
  | 'filter_list'
  | 'flag'
  | 'link'
  | 'link_off'
  | 'redo'
  | 'remove'
  | 'sort'
  | 'cloud'
  | 'cloud_off'
  | 'folder'
  | 'create_new_folder'
  | 'folder_open'
  | 'cloud_done'
  | 'keyboard_arrow_down'
  | 'keyboard_arrow_left'
  | 'keyboard_arrow_right'
  | 'keyboard_arrow_up'
  | 'smartphone'
  | 'tablet'
  | 'add_photo_alternate'
  | 'camera_alt'
  | 'expand_more'
  | 'expand_less'
  | 'arrow_back'
  | 'arrow_back_ios'
  | 'arrow_downward'
  | 'arrow_forward'
  | 'arrow_forward_ios'
  | 'fullscreen'
  | 'more_vert'
  | 'more_horiz'
  | 'refresh'
  | 'room_service'
  | 'free_breakfast'
  | 'group'
  | 'group_add'
  | 'share'
  | 'local_dining'
  | 'local_bar'
  | 'fastfood'
  | 'local_cafe'
  | 'kitchen'
  | 'meeting_room';

export type IconProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: string;
  color?: string;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  rotation?: number;
  name: GenericIconName;
  className?: string;
  inactive?: boolean;
};

const I = styled<{ rotation?: number; size?: string; color?: string }, 'i'>(
  'i',
)`
  transform: rotate(${props => props.rotation || 0}deg) translateY(10%);
  font-size: ${props => props.size || 'inherit'};
  color: ${props => props.color || 'inherit'};
`;

export const Icon = (props: IconProps) => (
  <I
    {...props}
    className={classnames(
      props.className,
      'material-icons',
      props.inactive ? 'md-inactive' : '',
    )}
  >
    {props.name}
  </I>
);

export default Icon;
