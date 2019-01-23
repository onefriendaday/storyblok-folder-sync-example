const StoryblokClient = require('storyblok-js-client')

// Insert your oauth token and folder id
const Storyblok = new StoryblokClient({
  oauthToken: 'OAUTH_TOKEN'
})

// Insert your source space and folder id
const spaceId = '44953'
const folderId = '126982'

// Insert your target space and folder id
const targetSpaceId = '49927'
const targetFolderId = '425533'

const StoryblokExporter = {
  getAll(page) {
    return Storyblok.get('spaces/' + spaceId + '/stories', {
      per_page: 25,
      with_parent: folderId,
      page: page
    })
  }
}

async function getAllStories(){
  var page = 1
  var res = await StoryblokExporter.getAll(page)
  var all = res.data.stories
  var total = res.total
  var lastPage = Math.ceil((res.total / 25))

  while (page < lastPage){
    page++
    res = await StoryblokExporter.getAll(page)
    res.data.stories.forEach((story) => {
      all.push(story)
    })
  }

  for (var i = 0; i < all.length; i++) {
    console.log(all[i].name)
    try {
      let resSingle = await Storyblok.get('spaces/' + spaceId + '/stories/' + all[i].id)
      let story = resSingle.data.story
      story.parent_id = targetFolderId

      let res = await Storyblok.post('spaces/' + targetSpaceId + '/stories', {
        story: story
      })
    } catch(e) {
      console.log(e.response.data)
    }
  }

  return all
}

getAllStories().then((result) => {
  console.log('Finished')
})