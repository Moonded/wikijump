//! SeaORM Entity. Generated by sea-orm-codegen 0.4.1

use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "ozone_session")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub session_id: String,
    pub started: Option<DateTime>,
    pub last_accessed: Option<DateTime>,
    pub ip_address: Option<String>,
    pub check_ip: bool,
    pub infinite: bool,
    pub user_id: Option<i32>,
    pub serialized_datablock: Option<Vec<u8>>,
    pub ip_address_ssl: Option<String>,
    pub ua_hash: Option<String>,
}

#[derive(Copy, Clone, Debug, EnumIter)]
pub enum Relation {}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        panic!("No RelationDef")
    }
}

impl ActiveModelBehavior for ActiveModel {}
