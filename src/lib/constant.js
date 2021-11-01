import { BASE_PATH } from "../config/settings";

export default class Constants {
  static DEFAULT_PROFILE = `${BASE_PATH}/default-profile-pic.png`;
  // static DEFAULT_PROFILE = `/default-profile-pic.png`;


  static IV = 'Jx7wyKi67LBICY1w';
  static KEY = '8VUK2RFKZUbbpXPhWYXGSvZzixsD9kec';
  static ALOGORITHM = 'aes-256-cbc';
  static DECRYPT = 1;
  
  static ACTIVE_STATUS = 1;
  static ACTIVE_USER = "Active";
  static PENDING_USER = "Pending";

  static WEEKLY_LEADERBOARD = 1;
  static MONTHLY_LEADERBOARD = 2;

  static REWARD_CASH = 1;
  static REWARD_PHYSICAL = 2;

  static TRANSACTION_DEBIT = 1;
  static TRANSACTION_CREDIT = 2;

  static REGISTRATION_STARTED = 1;
  static REGISTRATION_NOT_STARTED = 2;

  static PLAYER_ACTIVE = 1;
  static PLAYER_BLOCKED = 2;

  static TYPE_TIME_LIMIT = 1;
  static TYPE_COMMISSION = 2;

  static ACTION_DELETE_USER = 1;
  static ACTION_BLOCK_USER = 2;
  static ACTION_UNBLOCK_USER = 3;
  static ACTION_UPDATE_NAME = 4;
  static ACTION_UPDATE_PROFILE_PIC = 5;

  static LEAGUE_GRAND = 1;
  static LEAGUE_SHORT = 2;
  static CUSTOM_LEAGUE = 3;
  static PRACTICE_LEAGUE = 4;

  static LEAGUE_CREATE = 1;
  static LEAGUE_EDIT = 2;
  static LEAGUE_DELETE = 3;

  static PROFILE_FOLDER_PATH = `../../assets/profile`;

  static CURRENT_TIME = Math.round(new Date().getTime() /1000);

}