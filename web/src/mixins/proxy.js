const proxy = 'proxy__';
const internal = 'internal__';

export default (name, event, handle) => ({
  name: 'state-proxy',
  data() {
    return {
      [internal + name]: null,
    };
  },
  created() {
    this[internal + name] = this[name];
  },
  computed: {
    [proxy + name]: {
      get() {
        return this[internal + name];
      },
      set(value) {
        this[internal + name] =
          typeof handle === 'function' ? handle.call(this, value) : value;
        const eventName =
          event || (name === 'value' ? 'input' : 'update:' + name);
        this.$emit(eventName, value);
      },
    },
  },
  methods: {
    proxy(_name) {
      return this[proxy + _name];
    },
  },
  watch: {
    [name]() {
      this[internal + name] = this[name];
    },
  },
});
