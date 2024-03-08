<template>
  <div class="subsection">
    <h3>Prochain cours :</h3>
    <p v-if="!this.courseCanceled" class="nextDate">Le {{ nextCourse.day }} {{ nextCourse.month }} à {{ nextCourse.hour }}:{{ nextCourse.minute }}</p>
    <div class="parent">
      <p v-if="this.courseCanceled">Cours annulé <i class="fa-solid fa-traangle-exclamation"></i></p>
      <p v-if="this.user.role === 'Admin'"><span v-if="!this.courseCanceled">Annuler</span><span v-else>Confirmer</span> le cours : <i v-if="!this.courseCanceled" class="fa-solid fa-circle-xmark" @click.stop="cancelCourse()"></i><i v-else class="fa-solid fa-arrow-left" @click.stop="cancelCourse()"></i> <i v-if="!this.showDate" class="fa-solid fa-circle-plus" @click.stop="showControls()"></i><i v-else class="fa-solid fa-circle-minus" @click.stop="showControls()"></i></p>
      <DateUpdate class="controls" v-if="this.showDate && this.user.role === 'Admin'" @error="errorHandler()" @dateUpdated="updateCourse()" id="newCourseDate" action="updateNextCourse"/>
    </div>
  </div>
</template>

<script>
import DateUpdate from '@/components/DateUpdate.vue';
import { mapState } from 'vuex'

export default {
  name: "CourseComp",
  data() {
    return {
      courseCanceled: false,
      showDate: false,
      errorMsg: ""
    }
  },
  components: {
    DateUpdate
  },
  computed: {
    ...mapState(['user', 'nextCourse', 'isCourseCanceled'])
  },
  mounted() {
    this.courseCanceled = this.isCourseCanceled
  },
  methods: {
    showControls() {
      this.showDate = !this.showDate
    },
    cancelCourse() {
      this.$store.dispatch('updateCourseStatus', !this.courseCanceled)
        .then((boolean) => {
          this.courseCanceled = boolean
        })
      //this.courseCanceled = !this.courseCanceled
    },
    updateCourse() {
      this.courseCanceled = false
    },
    errorHandler() {
      
    }
  }
}
</script>

<style lang="scss">
</style>