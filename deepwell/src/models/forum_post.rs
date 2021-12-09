//! SeaORM Entity. Generated by sea-orm-codegen 0.4.1

use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "forum_post")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub post_id: i64,
    pub thread_id: Option<i32>,
    pub parent_id: Option<i32>,
    pub user_id: Option<i32>,
    pub user_string: Option<String>,
    pub title: Option<String>,
    pub text: Option<String>,
    pub date_posted: Option<DateTime>,
    pub site_id: Option<i32>,
    pub revision_number: i32,
    pub revision_id: Option<i32>,
    pub date_last_edited: Option<DateTime>,
    pub edited_user_id: Option<i32>,
    pub edited_user_string: Option<String>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::site::Entity",
        from = "Column::SiteId",
        to = "super::site::Column::SiteId",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    Site,
    #[sea_orm(has_many = "super::forum_thread::Entity")]
    ForumThread,
    #[sea_orm(has_many = "super::forum_category::Entity")]
    ForumCategory,
}

impl Related<super::site::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Site.def()
    }
}

impl Related<super::forum_thread::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::ForumThread.def()
    }
}

impl Related<super::forum_category::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::ForumCategory.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
