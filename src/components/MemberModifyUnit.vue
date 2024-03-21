<template>
  <div class="unit unit--member">
    <div class="unit__infos unit__infos--member">
      <div class="unit__infos__text unit__infos__text--member">
        <i v-if="!this.showControls" class="fa-solid fa-circle-plus" @click.stop="showMenu()"></i>
        <i v-else class="fa-solid fa-circle-minus" @click.stop="showMenu()"></i>
        <span class="unit__infos__text__unit unit__infos__text__unit--member--firstName">{{ member.firstName }}<span class="tooltip tooltip--member--firstName">{{ member.firstName }}</span></span>
        <span class="unit__infos__text__unit unit__infos__text__unit--member--lastName">{{ member.lastName }}<span class="tooltip tooltip--member--lastName">{{ member.lastName }}</span></span>
         | <span class="unit__infos__text__unit unit__infos__text__infos--member--role">{{ member.role }}<span class="tooltip tooltip--member--role">{{ member.role }}</span></span>
      </div>
      <div class="unit__infos__controls unit__infos__controls--member">
        <MemberModifyUnitDelete :member="member" @errorDelete="errorDelete($event)"/>
      </div>
    </div>
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

<style lang="scss">
.unit {
  &__infos {
    &__controls {
      &.unit__infos__controls--member {
        top: -13px;
        right: -10px;
      }
    }
  }
}
</style>