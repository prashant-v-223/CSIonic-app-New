import { IconProp } from "@fortawesome/fontawesome-svg-core"

export enum ErrorEnum {
  NO_INTERNET = 'no-internet',
  SOMETHING_WENT_WRONG = 'something-went-wrong'
}

export interface ErrorMessage {
  title: string,
  desc: string,
  image?: string,
  icon?: IconProp,
  showActionButton: boolean,
  actionButtonText?: string,
}

export const AvailableErrorMessage: {
  [key in ErrorEnum]: ErrorMessage
} = {
  [ErrorEnum.NO_INTERNET]: {
    title: 'No internet connection',
    desc: 'Please check your internet connection and try again',
    icon: 'broadcast-tower',
    showActionButton: true,
    actionButtonText: 'Try again'
  },
  [ErrorEnum.SOMETHING_WENT_WRONG]: {
    title: 'Something went wrong',
    desc: "Sorry, something went wrong here, please try again!",
    icon: 'exclamation-circle',
    showActionButton: true,
    actionButtonText: 'Back to home'
  }
}