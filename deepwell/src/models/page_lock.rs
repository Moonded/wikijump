//! `SeaORM` Entity, @generated by sea-orm-codegen 1.0.1

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq, Serialize, Deserialize)]
#[sea_orm(table_name = "page_lock")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub page_lock_id: i64,
    pub created_at: TimeDateTimeWithTimeZone,
    pub updated_at: Option<TimeDateTimeWithTimeZone>,
    pub deleted_at: Option<TimeDateTimeWithTimeZone>,
    pub expires_at: Option<TimeDateTimeWithTimeZone>,
    pub from_wikidot: bool,
    #[sea_orm(column_type = "Text")]
    pub lock_type: String,
    pub page_id: i64,
    pub user_id: i64,
    #[sea_orm(column_type = "Text")]
    pub reason: String,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::page::Entity",
        from = "Column::PageId",
        to = "super::page::Column::PageId",
        on_update = "NoAction",
        on_delete = "NoAction"
    )]
    Page,
    #[sea_orm(
        belongs_to = "super::user::Entity",
        from = "Column::UserId",
        to = "super::user::Column::UserId",
        on_update = "NoAction",
        on_delete = "NoAction"
    )]
    User,
}

impl Related<super::page::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Page.def()
    }
}

impl Related<super::user::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::User.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
