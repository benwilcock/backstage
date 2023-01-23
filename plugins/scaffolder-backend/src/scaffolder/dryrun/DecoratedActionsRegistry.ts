/*
 * Copyright 2022 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TemplateAction } from '@backstage/plugin-scaffolder-node';
import { JsonObject } from '@backstage/types';
import { TemplateActionRegistry } from '../actions';

/** @internal */
export class DecoratedActionsRegistry extends TemplateActionRegistry {
  constructor(
    private readonly innerRegistry: TemplateActionRegistry,
    extraActions: Array<TemplateAction<JsonObject>>,
  ) {
    super();
    for (const action of extraActions) {
      this.register(action);
    }
  }

  get(actionId: string): TemplateAction<JsonObject> {
    try {
      return super.get(actionId);
    } catch {
      return this.innerRegistry.get(actionId);
    }
  }
}
