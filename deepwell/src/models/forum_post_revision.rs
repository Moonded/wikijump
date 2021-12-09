//! SeaORM Entity. Generated by sea-orm-codegen 0.4.1

use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "forum_post_revision")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub revision_id: i64,
    pub post_id: Option<i32>,
    pub user_id: Option<i32>,
    pub user_string: Option<String>,
    pub text: Option<String>,
    pub title: Option<String>,
    pub date: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter)]
pub enum Relation {}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        panic!("No RelationDef")
    }
}

impl ActiveModelBehavior for ActiveModel {}
