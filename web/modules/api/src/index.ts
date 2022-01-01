import { WikijumpAPI } from "./api"

export default WikijumpAPI

export { ContentType, ForumSortingTypes, ReferenceTypes, UserRole } from "../vendor/api"

// there really isn't a decent way to just "pick out" exports,
// so this type export is a bit manual, but oh well
export type {
  AccountSettings,
  AccountSettingsPatch,
  ApiConfig,
  Application,
  ApplicationList,
  ApplicationSend,
  ApplicationSendList,
  AvatarURL,
  AvatarURLObject,
  Base64,
  CastVote,
  CastVoteObject,
  CastVotePlus,
  CastVotePlusMinus,
  CastVoteStar,
  CastVoteStatus,
  Category,
  CategoryDefault,
  CategoryDefaultPatch,
  CategoryList,
  CategoryPatch,
  CreateSiteSettings,
  CSRF,
  Email,
  EmailObject,
  ErrorEnumLogin,
  ErrorEnumRegister,
  FileData,
  FileMetadata,
  FileMetadataList,
  FileSiteMetadata,
  FileUpload,
  Forum,
  ForumCategory,
  ForumCategoryCreate,
  ForumCategoryList,
  ForumCategoryPatch,
  ForumCreationContext,
  ForumGroup,
  ForumGroupList,
  ForumGroupPatch,
  ForumPost,
  ForumPostCreate,
  ForumPostList,
  ForumPostPatch,
  ForumThread,
  ForumThreadCreate,
  ForumThreadList,
  ForumThreadPatch,
  FTMLSyntaxTree,
  FullRequestParams,
  HTML,
  HTMLObject,
  Invite,
  InviteList,
  InviteSend,
  LoginOptions,
  LoginSpecifier,
  Membership,
  MembershipList,
  MembershipRole,
  MembershipStatus,
  Message,
  MessageList,
  MessagePatch,
  MessageSend,
  Mime,
  Notification,
  NotificationList,
  Page,
  PageCreateOptions,
  PagePatch,
  Paginated,
  Password,
  PasswordObject,
  Reference,
  ReferenceTypesObject,
  RegisterOptions,
  Report,
  ReportList,
  ReportSend,
  RequestParams,
  Revision,
  RevisionHistory,
  RevisionPatch,
  Score,
  SessionState,
  SiteName,
  SiteNewsletter,
  SiteSettings,
  SiteSettingsPatch,
  SiteTransfer,
  Slug,
  SlugObject,
  TagList,
  TagListObject,
  UpdateEmail,
  UpdatePassword,
  UserBan,
  UserBanned,
  UserBannedList,
  UserBlocked,
  UserBlockedList,
  UserIdentity,
  UserInfo,
  UserKick,
  Username,
  UsernameObject,
  UserProfile,
  UserProfilePatch,
  Vote,
  VoterList,
  Wikitext,
  WikitextObject
} from "../vendor/api"
export * from "./api"
export * from "./asset"
export * from "./route"
