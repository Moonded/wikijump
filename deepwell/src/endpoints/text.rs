/*
 * endpoints/text.rs
 *
 * DEEPWELL - Wikijump API provider and database manager
 * Copyright (C) 2019-2023 Wikijump Team
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

use super::prelude::*;
use crate::hash::TextHash;

pub async fn text_create(
    ctx: ServiceContext<'_>,
    params: Params<'static>,
) -> Result<String> {
    let contents: String = params.one()?;
    tide::log::info!("Inserting new stored text (bytes {})", contents.len());
    let hash = TextService::create(&ctx, contents).await?;
    let hash_hex = hex::encode(hash);
    Ok(hash_hex)
}

pub async fn text_get(
    ctx: ServiceContext<'_>,
    params: Params<'static>,
) -> Result<String> {
    tide::log::info!("Getting stored text");
    let hash_hex: String = params.one()?;
    let hash = read_hash(&hash_hex)?;
    TextService::get(&ctx, &hash).await
}

fn read_hash(hash_hex: &str) -> StdResult<TextHash, TideError> {
    tide::log::debug!("Text hash: {hash_hex}");

    let mut hash = [0; 16];
    hex::decode_to_slice(hash_hex, &mut hash)
        .map_err(|error| TideError::new(StatusCode::UnprocessableEntity, error))?;

    Ok(hash)
}
