<template>
  <div class="login">
    <div class="login-con">
      <div class="menu-tab">
        <ul>
          <li
            v-for="v in menuData"
            :class="{ current: v.current }"
            :key="v.type"
            @click="clickMenu(v)"
          >
            {{ v.txt }}
          </li>
        </ul>
        <!-- 表单 -->
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-form-item prop="email">
            <label for="">邮箱</label>
            <el-input v-model="ruleForm.email" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="password">
            <label for="">密码</label>
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="confirmPassword" v-show="model === 'register'">
            <label for="">确认密码</label>
            <el-input
              v-model="ruleForm.confirmPassword"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="login-btn block"
              @click="submitForm(ruleFormRef)"
              >{{ model === "login" ? "登录" : "注册" }}</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import type { FormInstance } from "element-plus";
import "element-plus/dist/index.css";
import { CheckEmail, CheckPassword } from "../../utils/verify";
import link from "../../api/link";
import apiUrl from "../../api/url";
import { ElMessage } from "element-plus";
import MD5 from "../../hook/index";
import {useRouter} from "vue-router"

let router = useRouter()

const menuData = reactive([
  { txt: "登录", current: true, type: "login" },
  { txt: "注册", current: false, type: "register" },
]);

let model = ref("login");

let clickMenu = (item: any) => {
  menuData.forEach((element) => {
    element.current = false;
  });
  item.current = true;

  //修改点击的状态
  model.value = item.type;
};

//表单
const ruleFormRef = ref<FormInstance>();

const checkEmail = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("邮箱不能为空！！"));
  } else if (CheckEmail(value)) {
    return callback(new Error("邮箱格式不正确！！"));
  } else {
    callback();
  }
};

const checkPassword = (rule: any, value: any, callback: any) => {
  if (value.trim() === "") {
    callback(new Error("密码不能为空"));
  } else if (CheckPassword(value)) {
    callback(
      new Error(
        "必须包含大小写字母和数字的组合,不能使用特殊字符,长度在8-10之间"
      )
    );
  } else {
    callback();
  }
};

const checkConfirmPassword = (rule: any, value: any, callback: any) => {
  // 因为登录的时候没有重复密码的校验  所以在登录的时候取消重复密码的校验
  if (model.value === "login") {
    callback();
  }
  if (value.trim() === "") {
    callback(new Error("密码不能为空"));
  } else if (value !== ruleForm.password) {
    callback(new Error("两次密码必须相同"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

let btnBool = ref(true);
watch(ruleForm, (newValue, oldValue) => {
  if (model.value === "login") {
    if (newValue.email != "" && newValue.password != "") {
      btnBool.value = false;
    } else {
      btnBool.value = true;
    }
  } else {
    if (
      newValue.email != "" &&
      newValue.password != "" &&
      newValue.confirmPassword != ""
    ) {
      btnBool.value = false;
    } else {
      btnBool.value = true;
    }
  }
});

const rules = reactive({
  email: [{ validator: checkEmail, trigger: "blur" }],
  password: [{ validator: checkPassword, trigger: "blur" }],
  confirmPassword: [{ validator: checkConfirmPassword, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (model.value === "login") {
        console.log("登录");
        link(
          apiUrl.register,
          "GET",
          {},
          { email: ruleForm.email, password: MD5(ruleForm.password).value }
        ).then((ok:any) => {
          if(ok.data.length!=0){
            ElMessage({
              message: "登录成功",
              type: "success",
            });
            router.push("/home")
          }else{
            ElMessage({
              message: "登录失败",
              type: "error",
            });
          }
        });
      } else {
        let data = {
          email: ruleForm.email,
          password: MD5(ruleForm.password).value,
        };
        link(apiUrl.register, "POST", data, {}).then((ok: any) => {
          if (Object.keys(ok.data).length !== 0) {
            ElMessage({
              message: "注册成功",
              type: "success",
            });

            model.value = "login";

            menuData.forEach((v) => {
              v.current = false;
            });
            menuData[0].current = true;
          } else {
            ElMessage({
              message: "注册失败",
              type: "error",
            });
          }
        });
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss">
.login {
  background-color: #000066;
  height: 100%;
}

html,
body,
#app {
  height: 100%;
}

.menu-tab {
  padding-top: 15vh;
  text-align: center;
  li {
    display: inline-block;
    width: 5.5rem;
    line-height: 2.2rem;
    font-size: 1rem;
    color: #fff;
    border-radius: 0.2rem;
    cursor: pointer;
  }
  .current {
    background-color: rgba(255, 255, 255, 0.5);
  }
}

.demo-ruleForm {
  width: 25vw;
  margin: 50px auto;
  label {
    display: block;
    margin-bottom: 0.3rem;
    font-size: 1rem;
    color: #fff;
  }
  .block {
    display: block;
    width: 100vw;
  }
  .login-btn {
    margin-top: 1.2rem;
  }
}
</style>