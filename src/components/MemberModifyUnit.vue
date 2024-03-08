<template>
  <div>
    <p>{{ member.firstName }} {{ member.lastName }} | {{ member.role }} <i v-if="!this.showControls" class="fa-solid fa-circle-plus" @click.stop="showMenu()"></i><i v-else class="fa-solid fa-circle-minus" @click.stop="showMenu()"></i> <MemberModifyUnitDelete :member="member" @errorDelete="errorDelete($event)"/></p>
    <MemberModifyUnitMenu v-if="this.showControls" :member="member" @updated="showMenu()"/>
  </div>
</template>

<script>
import MemberModifyUnitMenu from '@/components/MemberModifyUnitMenu.vue'
import MemberModifyUnitDelete from '@/components/MemberModifyUnitDelete.vue'

export default {
  name: "MemberModifyUnit",
  data() {
    return {
      showControls: false
    }
  },
  props: {
    member: Object
  },
  components: {
    MemberModifyUnitMenu,
    MemberModifyUnitDelete
  },
  methods: {
    showMenu() {
      this.showControls = !this.showControls
    }
  }
}
</script>