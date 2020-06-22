export const getTracksMixin = {
  data() {
    return {
      tracks: []
    }
  },
  methods: {
    getTrackIds(list, num) {
      let tempTrackIds = ''
      if (num !== undefined) {
        list = list.slice(0, num)
      }
      for (const track of list) {
        tempTrackIds += track.id + ','
      }
      return tempTrackIds.slice(0, -1)
    }
  }
}

export const roundCountMixin = {
  filters: {
    round: function(val) {
      if (!val) {
        return ''
      } else if (val >= 10000000) {
        return Math.ceil(val / 10000000) + '亿'
      } else if (val >= 10000) {
        return Math.ceil(val / 10000) + '万'
      } else {
        return val
      }
    }
  }
}

export const getArtistsMixin = {
  computed: {
    artists: function() {
      return function(artistList) {
        let temp = ''
        if (artistList.length > 1) {
          artistList.forEach(artist => {
            temp += artist.name + '/'
          })
          return temp.slice(0, -1)
        } else {
          return artistList[0].name
        }
      }
    }
  }
}
