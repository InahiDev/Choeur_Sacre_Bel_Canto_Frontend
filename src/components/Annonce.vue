<template>
  <section class="annonce">
    <RepetitionComp/>
    <CourseComp/>
  </section>
</template>

<script>
import RepetitionComp from './RepetitionComp.vue'
import CourseComp from './CourseComp.vue'
import { mapState } from 'vuex'

export default {
  name: "AnnonceView",
  data() {
    return {
      courseCanceled: false,
      showModifyDate: false,
      courseErrorMsg: "",
    }
  },
  computed: {
    ...mapState(['user', 'nextCourse'])
  },
  methods: {
    modifyCourseDate() {
      const newDate = document.getElementById('newCourseDate').value
      if (newDate) {
        let newCourseDate = this.parseDate(newDate)
        newCourseDate.month = this.translateMonth(newCourseDate.month)
        this.$store.dispatch('updateNextCourse', newCourseDate)
          .then(() => {
            this.courseErrorMsg = ""
          })
          .catch((error) => {
            this.courseErrorMsg = "Un problème est survenu: " + error
          })
      }
    },
    updateRepetitionDate(date) {
      if (date) {
        this.$store.dispatch('updateRepetitionDate', date)
      }
    }
  },
  components: {
    CourseComp,
    RepetitionComp
  }
}
</script>

<style lang="scss">
section {
  box-sizing: border-box;
  background-color: $bg-white;
  width: 95%;
  margin: 10px;
  padding: 15px;
  border-radius: $radius-components;
  box-shadow: $shadow-section;
  @include column;
  row-gap: 15px;

  .subsection {
    box-sizing: border-box;
    width: 90%;
    padding: 10px;
    border-radius: $radius-controls;
    box-shadow: $shadow-controls;
  }
}

.next {
  margin: 5px 0;
  font-size: 1em;

  &__static {
    font-size: 1.1em;
  }

  &__dynamic {
    font-size: 1em;
    padding: 2px;
    margin: 5px 0;
  }
}
</style>