/*
 * services/system_filter/struct.rs
 *
 * DEEPWELL - Wikijump API provider and database manager
 * Copyright (C) 2019-2022 Wikijump Team
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

use crate::models::sea_orm_active_enums::SystemFilterType;

#[derive(Deserialize, Debug, Clone)]
pub struct CreateSystemFilter {
    filter_type: SystemFilterType,
    regex: String,
    reason: String,
}

#[derive(Deserialize, Debug, Clone)]
pub struct UpdateSystemFilter {
    filter_id: i64,
    regex: String,
    reason: String,
}
