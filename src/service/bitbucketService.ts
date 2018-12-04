"use strict";

import * as Bitbucket from 'bitbucket';

export class BitbucketService {
  public userName: string = null;
  public name: string = null;
  private bitbucket: Bitbucket = null;
  private GIST_JSON_EMPTY: any = {
    description: "Visual Studio Code Sync Settings Gist",
    is_private: false,
    title: "VS Code settigns",
    files: {
      "settings.json": {
        content: "// Empty"
      },
      "launch.json": {
        content: "// Empty"
      },
      "keybindings.json": {
        content: "// Empty"
      },
      "extensions.json": {
        content: "// Empty"
      },
      "locale.json": {
        content: "// Empty"
      },
      "keybindingsMac.json": {
        content: "// Empty"
      },
      cloudSettings: {
        content: "// Empty"
      }
    }
  };

  constructor (username: string, password: string) {
    this.bitbucket = new Bitbucket()
    this.bitbucket.authenticate({
      type: 'basic',
      username,
      password
    })
  }

  public async CreateEmptyGIST(
    publicGist: boolean,
    gistDescription: string
  ): Promise<string> {
    this.GIST_JSON_EMPTY.is_private = !publicGist;
    if (gistDescription !== null && gistDescription !== '') {
      this.GIST_JSON_EMPTY.description = gistDescription
    }

    try {
      const res = await this.bitbucket.snippets.create({
        _body: this.GIST_JSON_EMPTY
      })

      if (res.data && res.data.id) {
        return res.data.id.toString()
      } else {
        console.error('Id is Null')
        console.log(res.data)
      }
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}