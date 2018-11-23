# Instructions


1. Download and install Storyblok's SDK

~~~
$ git clone https://github.com/onefriendaday/storyblok-folder-sync-example.git
$ cd storyblok-folder-sync-example
$ npm install
~~~

2. INSERT your oauth token from the my account section and the source and target for the sync process

~~~
// Insert your oauth token and folder id
const Storyblok = new StoryblokClient({
  oauthToken: 'INSERT'
})

// Insert your source space and folder id
const spaceId = 'INSERT'
const folderId = 'INSERT'

// Insert your target space and folder id
const targetSpaceId = 'INSERT'
const targetFolderId = 'INSERT'
~~~

3. Execute the script

~~~
$ node index.js
~~~